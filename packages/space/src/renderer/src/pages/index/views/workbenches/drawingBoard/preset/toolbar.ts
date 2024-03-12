
import { reactive } from 'vue';

export const lineTypes = reactive([
  { name: '曲线', icon: '#l-curve2', value: 'curve' },
  { name: '线段', icon: '#l-polyline', value: 'polyline' },
  { name: '直线', icon: '#l-line', value: 'line' },
  { name: '脑图曲线', icon: '#l-mind', value: 'mind' },
]);

export const fromArrows = reactive([
  { icon: '#l-line', value: '' },
  { icon: '#l-from-triangle', value: 'triangle' },
  { icon: '#l-from-diamond', value: 'diamond' },
  { icon: '#l-from-circle', value: 'circle' },
  { icon: '#l-from-lineDown', value: 'lineDown' },
  { icon: '#l-from-lineUp', value: 'lineUp' },
  { icon: '#l-from-triangleSolid', value: 'triangleSolid' },
  { icon: '#l-from-diamondSolid', value: 'diamondSolid' },
  { icon: '#l-from-circleSolid', value: 'circleSolid' },
  { icon: '#l-from-line', value: 'line' },
]);

export const toArrows = reactive([
  { icon: '#l-line', value: '' },
  { icon: '#l-to-triangle', value: 'triangle' },
  { icon: '#l-to-diamond', value: 'diamond' },
  { icon: '#l-to-circle', value: 'circle' },
  { icon: '#l-to-lineDown', value: 'lineDown' },
  { icon: '#l-to-lineUp', value: 'lineUp' },
  { icon: '#l-to-triangleSolid', value: 'triangleSolid' },
  { icon: '#l-to-diamondSolid', value: 'diamondSolid' },
  { icon: '#l-to-circleSolid', value: 'circleSolid' },
  { icon: '#l-to-line', value: 'line' },
]);
