import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RoomApiService } from './room-api.service';

describe('RoomApiService', () => {
  let service: RoomApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RoomApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRoom should GET /rooms/:id', () => {
    const mockState = { playlist: [], currentIndex: 0, isPlaying: false, currentTime: 0, messages: [] };
    service.getRoom('demo-room').subscribe(state => {
      expect(state).toEqual(mockState);
    });
    const req = http.expectOne(r => r.url.includes('/rooms/demo-room') && r.method === 'GET');
    req.flush(mockState);
  });

  it('postMessage should POST to /rooms/:id/messages', () => {
    const mockMsg = { id: '1', author: 'Alice', text: 'hi', sentAt: new Date().toISOString() };
    service.postMessage('demo-room', 'Alice', 'hi').subscribe(msg => {
      expect(msg.author).toBe('Alice');
      expect(msg.text).toBe('hi');
    });
    const req = http.expectOne(r => r.url.includes('/rooms/demo-room/messages') && r.method === 'POST');
    expect(req.request.body).toEqual({ author: 'Alice', text: 'hi' });
    req.flush(mockMsg);
  });
});
