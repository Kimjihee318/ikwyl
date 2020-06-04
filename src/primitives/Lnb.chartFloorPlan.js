export default {
  canvas: {
    CanvasWidth: 335.5,
    CanvasHeight: 190.5,
    CanvasBgColor: '#0f1333',
    CanvasBgPointColor: '#1a2157',
    CanvasBorderWeight: 1,
    CanvasBorderColor: '#81a8e3',
    CanvasChartX: 0,
    CanvasChartY: 0
  },
  floorInfo: {
    Userfloor: 9, // GET FROM DB
    UserUnitNo: 9, // GET FROM DB
    UnitNumbers: 12,
    UnitsMaxSide: 7,
    UnitsMinSide: null,
    Sides: 2,
    TopFloor: 10
  },
  unit: {
    UnitWidth: 30,
    UnitHeight: 30,
    UnitFillColor: '#1a2157',
    UnitFillPointColor: '#2d519f',
    UnitStroke: '#81a8e3',
    UnitStrokeWidth: 1,
    UnitTextColor: '#ffffff',
    UnitTextFont: null,
    UnitTextSize: '0.7rem',
    UnitSmellRectWidth: 2,
    UnitSmellRectHeight: 10,
    UnitSmellRectColor: '#ffffff'
  },
  // Draw data
  dataItems: [
    {
      floor: 9,
      units: [
        { userId: '1', userName: 'jihee', floorNo: 9, unitNo: 901, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 902, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 903, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 904, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 905, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 906, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 907, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 908, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 909, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 910, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 911, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 912, smell: 1, time: new Date() }
      ]
    }
  ]
}
