import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MarketplacePage } from './Marketplace';

describe('MarketplacePage', () => {
  let component: MarketplacePage;
  let fixture: ComponentFixture<MarketplacePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketplacePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MarketplacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
