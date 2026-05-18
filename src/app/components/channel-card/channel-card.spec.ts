import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCard } from './channel-card';

describe('ChannelCard', () => {
  let component: ChannelCard;
  let fixture: ComponentFixture<ChannelCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
