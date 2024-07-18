export const randomRegion = (min: number, max: number) => (Math.random() * (max - min) + min);

export const randomRegionForInt = (min: number, max: number) => Math.round(randomRegion(min - 0.5, max + 0.5));

export const randomHexColor = () => `#${Math.floor(randomRegionForInt(0, 0xFFFFFF)).toString(16).toUpperCase()}`;

let target = 1;
while (target >= 0 && target <= 10) {
  target = randomRegionForInt(0, 10);
  if (target === 0 || target === 10) {
    console.log('边界');
  }

  if (target < 0 || target > 10) {
    console.log('error');
  }
  console.log(target.toString(16).toUpperCase());
}

