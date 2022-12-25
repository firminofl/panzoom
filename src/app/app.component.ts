import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2, ViewChild
} from '@angular/core';
import {PanZoomAPI, PanZoomConfig, PanZoomConfigOptions, PanZoomModel} from "ngx-panzoom";
import {Subscription} from "rxjs";
import {deepCopy, getCssScale} from './utils/deep-copy';
import {IMenu} from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('gridElement', {static: true}) private gridElement: ElementRef | undefined;

  menu: IMenu[] = [
    {
      icon: 'arrow_back',
      tooltip: 'Pan left | panZoomAPI.panDelta( { x: -100, y: 0 } )',
      invokeMethod: () => this.onPanLeft100Clicked(),
      fullscreen: false
    },
    {
      icon: 'arrow_forward',
      tooltip: 'Pan right | panZoomAPI.panDelta( { x: 100, y: 0 } )',
      invokeMethod: () => this.onPanRight100Clicked(),
      fullscreen: false
    },
    {
      icon: 'arrow_upward',
      tooltip: 'Pan up | panZoomAPI.panDelta( { x: 0, y: -100 } )',
      invokeMethod: () => this.onPanUp100Clicked(),
      fullscreen: false
    },
    {
      icon: 'arrow_downward',
      tooltip: 'Pan down | panZoomAPI.panDelta( { x: 0, y: 100 } )',
      invokeMethod: () => this.onPanDown100Clicked(),
      fullscreen: false
    },
    {
      icon: 'fullscreen',
      tooltip: 'Toggle Fullscren',
      invokeMethod: () => {},
      fullscreen: true
    },
    {
      icon: 'zoom_in',
      tooltip: 'Zoom in one zoomLevel | panZoomAPI.zoomIn(\'viewCenter\')',
      invokeMethod: () => this.onZoomInClicked(),
      fullscreen: false
    },
    {
      icon: 'zoom_out',
      tooltip: 'Zoom out one zoomLevel | panZoomAPI.zoomOut(\'viewCenter\')',
      invokeMethod: () => this.onZoomOutClicked(),
      fullscreen: false
    },
    {
      icon: 'center_focus_weak',
      tooltip: 'Reset view to initial state | panZoomAPI.resetView()',
      invokeMethod: () => this.onResetViewClicked(),
      fullscreen: false
    },
    {
      icon: 'center_focus_strong',
      tooltip: 'Pan to the centre of the content | panZoomAPI.centerContent()',
      invokeMethod: () => this.onCenterContentClicked(),
      fullscreen: false
    }
  ];


  title = 'panzoom-guides';

  private panZoomConfigOptions: PanZoomConfigOptions = {
    zoomLevels: 10,
    scalePerZoomLevel: 2.0,
    zoomStepDuration: 0.4,
    freeMouseWheelFactor: 0.001,
    zoomToFitZoomLevelFactor: 0.9,
    dragMouseButton: 'middle'
  };

  panzoomConfig: PanZoomConfig = new PanZoomConfig(this.panZoomConfigOptions);

  // @ts-ignore
  private panZoomAPI: PanZoomAPI;
  private apiSubscription: Subscription | undefined;

  // @ts-ignore
  panzoomModel: PanZoomModel;

  private modelChangedSubscription: Subscription | undefined;
  scale = getCssScale(this.panzoomConfig?.initialZoomLevel, this.panzoomConfig?.scalePerZoomLevel, this.panzoomConfig?.neutralZoomLevel);

  // @ts-ignore
  initialZoomHeight: number = null; // set in resetZoomToFit()
  canvasWidth = 2400;
  initialZoomWidth = this.canvasWidth;
  initialised = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', 'bisque');
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'overflow', 'hidden');
    this.apiSubscription = this.panzoomConfig?.api.subscribe((api: PanZoomAPI) => this.panZoomAPI = api);
    this.modelChangedSubscription = this.panzoomConfig.modelChanged.subscribe((model: PanZoomModel) => this.onModelChanged(model));
  }

  ngAfterViewInit(): void {
    this.resetZoomToFit();
    this.initialised = true;
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.modelChangedSubscription.unsubscribe();
    // @ts-ignore
    this.apiSubscription.unsubscribe();
  }

  onModelChanged(model: PanZoomModel): void {
    this.panzoomModel = deepCopy(model);
    this.scale = getCssScale(this.panzoomModel?.zoomLevel, this.panzoomConfig?.scalePerZoomLevel, this.panzoomConfig?.neutralZoomLevel);
    this.changeDetector.markForCheck();
    this.changeDetector.detectChanges();
  }

  resetZoomToFit(): void {
    // @ts-ignore
    let height = this.gridElement.nativeElement.clientHeight;
    // @ts-ignore
    const width = this.gridElement.nativeElement.clientWidth;
    height = this.canvasWidth * height / width;
    this.panzoomConfig.initialZoomToFit = {
      x: 0,
      y: 0,
      width: this.canvasWidth,
      height
    };
    this.initialZoomHeight = height;
  }

  onZoomInClicked(): void {
    // @ts-ignore
    this.panZoomAPI.zoomIn('viewCenter');
  }

  onZoomOutClicked(): void {
    this.panZoomAPI.zoomOut('viewCenter');
  }

  onResetViewClicked(): void {
    this.panZoomAPI.resetView();
  }

  onPanLeft100Clicked(): void {
    this.panZoomAPI.panDelta({x: -100, y: 0});
  }

  onPanRight100Clicked(): void {
    this.panZoomAPI.panDelta({x: 100, y: 0});
  }

  onPanUp100Clicked(): void {
    this.panZoomAPI.panDelta({x: 0, y: -100});
  }

  onPanDown100Clicked(): void {
    this.panZoomAPI.panDelta({x: 0, y: 100});
  }

  onPanLeftPercentClicked(): void {
    this.panZoomAPI.panDeltaPercent({x: -20, y: 0});
  }

  onPanRightPercentClicked(): void {
    this.panZoomAPI.panDeltaPercent({x: 20, y: 0});
  }

  onPanUpPercentClicked(): void {
    this.panZoomAPI.panDeltaPercent({x: 0, y: -20});
  }

  onPanDownPercentClicked(): void {
    this.panZoomAPI.panDeltaPercent({x: 0, y: 20});
  }

  onPanToPointClicked(): void {
    this.panZoomAPI.panToPoint({x: 2400, y: 4270});
  }

  onCenterContentClicked(): void {
    this.panZoomAPI.centerContent();
  }

  onCenterXClicked(): void {
    this.panZoomAPI.centerX();
  }

  onCenterYClicked(): void {
    this.panZoomAPI.centerY();
  }

  onCenterTopLeftClicked(): void {
    this.panZoomAPI.centerTopLeft();
  }

  onCenterBottomLeftClicked(): void {
    this.panZoomAPI.centerBottomLeft();
  }

  onCenterTopRightClicked(): void {
    this.panZoomAPI.centerTopRight();
  }

  onCenterBottomRightClicked(): void {
    this.panZoomAPI.centerBottomRight();
  }
}
