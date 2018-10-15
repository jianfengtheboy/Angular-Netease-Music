import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentslistComponent } from './commentslist.component';

describe('CommentslistComponent', () => {
    let component: CommentslistComponent;
    let fixture: ComponentFixture<CommentslistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CommentslistComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentslistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
})
