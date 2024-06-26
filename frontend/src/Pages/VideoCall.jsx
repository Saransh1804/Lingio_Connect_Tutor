import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
// import { StreamChat } from 'stream-chat';
import { useQuery } from 'react-query';
import * as apiClient from '../apiClient.js';
import {
  CallingState,
  StreamCall,
  SpeakerLayout,
  CallControls,
  CallParticipantsList,
  StreamVideo,
  StreamTheme,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  ParticipantView,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import io from 'socket.io-client';

const VideoCall = () => {
  const { tutor } = useAppContext();
  const [socket, setSocket] = useState(null);
  const { studentId } = useParams();
  const tutorId = tutor[0]?._id;
  const name = tutor[0]?.fullName;
  const navigate = useNavigate();

  const { data: tokenData, isLoading } = useQuery(
    ['getToken', tutorId],
    () => apiClient.getToken(tutorId),
    { enabled: !!tutorId }
  );

  const token = tokenData?.token;

  const apiKey = '9nrade67axhx';
  const callId = `LingioConnect_${tutorId}`;

  useEffect(() => {
    
      const newSocket = io('https://lingio-connect.onrender.com');
      setSocket(newSocket);

      newSocket.emit('joinRoom', { senderId: tutorId, receiverId: studentId });
      newSocket.emit('sendCallId', { senderId: tutorId, receiverId: studentId, callId });

      return () => newSocket.close();
    
  }, [tutorId, studentId, callId]);

  // if (isLoading || !token) {
  //   return <div>Loading...</div>;
  // }

  const user = {
    id: tutorId,
    name,
    image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
  };

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call('default', callId);

  useEffect(() => {
    const joinCall = async () => {
      await call.join({ create: true });
    };
    joinCall();

    return () => {
      call.leave();
    };
  }, [call]);

  return (
    <div>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout navigate={navigate} studentId={studentId} />
          <CallParticipantsList />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCall;

export const MyUILayout = ({ navigate, studentId }) => {
  // const call = useCall();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();

  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  // if (callingState !== CallingState.JOINED) {
  //   return <div>Loading...</div>;
  // }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={() => navigate(`/student/${studentId}`)} />
    </StreamTheme>
  );
};

export const MyParticipantList = (props) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};