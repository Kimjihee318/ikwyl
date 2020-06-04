export default {
  canvas: {
    CanvasWidth: 220.5,
    CanvasHeight: 220.5,
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
  dataItems: [
    {
      floor: 8,
      units: [
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 801, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 802, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 803, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 804, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 805, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 806, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 807, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 808, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 809, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 800, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 801, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 8, unitNo: 802, smell: 1, time: new Date() }
      ]
    },
    {
      floor: 9,
      units: [
        { userId: '1', userName: 'jihee', floorNo: 9, unitNo: 901, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 902, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 903, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 904, smell: 2, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 905, smell: 2, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 906, smell: 3, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 907, smell: 2, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 908, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 909, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 910, smell: 2, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 911, smell: 3, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 9, unitNo: 912, smell: 4, time: new Date() }
      ]
    },
    {
      floor: 10,
      units: [
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1001, smell: 8, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1002, smell: 7, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1003, smell: 6, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1004, smell: 5, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1005, smell: 4, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1006, smell: 3, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1007, smell: 2, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1008, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1009, smell: 1, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1010, smell: 2, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1011, smell: 3, time: new Date() },
        { userId: '1', userName: 'A', floorNo: 10, unitNo: 1012, smell: 4, time: new Date() }
      ]
    }
  ]
}
