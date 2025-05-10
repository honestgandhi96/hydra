import { Room, RoomEvent, LocalTrack, Track, createLocalTracks } from 'livekit-client';

// Get LiveKit configuration from environment variables
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
const LIVEKIT_API_KEY = import.meta.env.VITE_LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = import.meta.env.VITE_LIVEKIT_API_SECRET;

class LiveKitService {
  private room: Room | null = null;
  private audioTrack: LocalTrack | null = null;
  private isConnected: boolean = false;
  private onAudioData: ((data: Float32Array) => void) | null = null;

  constructor() {
    this.room = new Room({
      adaptiveStream: true,
      dynacast: true,
      // For higher quality audio:
      audioCaptureDefaults: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 48000,
      },
    });

    this.setupRoomEventListeners();
  }

  private setupRoomEventListeners() {
    if (!this.room) return;

    this.room
      .on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        console.log('Track subscribed', track.sid, participant.identity);
      })
      .on(RoomEvent.Disconnected, () => {
        console.log('Disconnected from room');
        this.isConnected = false;
      })
      .on(RoomEvent.MediaDevicesError, (error) => {
        console.error('Media device error', error);
      });
  }

  public async connect(roomName: string, participantName: string, token?: string): Promise<boolean> {
    if (!this.room) return false;
    
    try {
      // Use provided token or generate one using API key/secret
      const roomToken = token || await this.generateToken(roomName, participantName);
      
      if (!roomToken) {
        console.error('No token available');
        return false;
      }
      
      await this.room.connect(LIVEKIT_URL, roomToken);
      console.log('Connected to room', roomName);
      
      this.isConnected = true;
      return true;
    } catch (error) {
      console.error('Failed to connect to room', error);
      return false;
    }
  }

  private async generateToken(roomName: string, participantName: string): Promise<string> {
    // In a production environment, token generation should be done server-side
    // This is just for demonstration purposes
    return `${LIVEKIT_API_KEY}:${participantName}:${roomName}`;
  }

  public async startAudioCapture(): Promise<boolean> {
    try {
      const tracks = await createLocalTracks({
        audio: true,
        video: false,
      });
      
      this.audioTrack = tracks.find(track => track.kind === Track.Kind.Audio) as LocalTrack;
      
      if (this.audioTrack && this.room && this.isConnected) {
        await this.room.localParticipant.publishTrack(this.audioTrack);
        
        // Setup audio processing if needed
        this.setupAudioProcessing();
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to start audio capture', error);
      return false;
    }
  }

  public stopAudioCapture(): void {
    if (this.audioTrack) {
      this.audioTrack.stop();
      if (this.room && this.isConnected) {
        this.room.localParticipant.unpublishTrack(this.audioTrack);
      }
      this.audioTrack = null;
    }
  }

  public async disconnect(): Promise<void> {
    this.stopAudioCapture();
    if (this.room) {
      await this.room.disconnect();
      this.isConnected = false;
    }
  }

  private setupAudioProcessing() {
    // This would implement audio processing with LiveKit
    // For example, getting raw audio data and processing it
    // This is a simplified version
    if (!this.audioTrack || !this.onAudioData) return;
    
    // In a real implementation, you would use AudioContext and 
    // process the audio data from the track
    console.log('Audio processing setup');
  }

  public onAudioDataAvailable(callback: (data: Float32Array) => void): void {
    this.onAudioData = callback;
  }

  public isRecording(): boolean {
    return this.audioTrack !== null && this.isConnected;
  }
}

// Export a singleton instance
export const livekitService = new LiveKitService();
export default livekitService;