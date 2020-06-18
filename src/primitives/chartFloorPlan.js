export default {
  canvas: {
    CanvasWidth: 584.5,
    CanvasHeight: 260.5,
    CanvasBgColor: '#0f1333',
    CanvasBgPointColor: '#1a2157',
    CanvasBorderWeight: 1,
    CanvasBorderColor: '#81a8e3',
    CanvasChartX: 0,
    CanvasChartY: 0
  },
  floorInfo: {
    Userfloor: 9, // GET FROM DB
    UserUnitNo: 1, // GET FROM DB
    UnitNumbers: 12,
    UnitsMaxSide: 7,
    UnitsMinSide: null,
    Sides: 2,
    TopFloor: 10
  },
  unit: {
    UnitWidth: 50,
    UnitHeight: 50,
    UnitFillColor: '#1a2157',
    UnitFillPointColor: '#2d519f',
    UnitStroke: '#81a8e3',
    UnitStrokeWidth: 1,
    UnitTextColor: '#ffffff',
    UnitTextFont: null,
    UnitTextSize: '0.8rem',
    UnitSmellRectWidth: 2,
    UnitSmellRectHeight: 10,
    UnitSmellRectColor: '#ffffff'
  },
  // Draw data
  // !FIX ME
  // Props로 넘겨줄때 데이터 베이스 확정 전 직접 필터링 해서 데이터 넘겨줌
  dataItems: []
}
