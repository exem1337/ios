import { ISystemDot } from 'src/models/fuzzy.model';
import { IRuleDots } from 'src/models/rules.model';

export function fillDotsDefaultValues(dot: ISystemDot): ISystemDot {
  for (let i = 0; i < dot.Values?.length; i++) {
    let diff = dot.Values?.[i]?.Value?.x?.length - dot.Values?.[i]?.Value?.y?.length;

    while (diff) {
      dot.Values?.[i]?.Value?.y?.push(0);
      diff--;
    }

    if (dot.Values?.[i]?.Value?.x?.length === 3) {
      dot.Values?.[i]?.Value?.y?.push(0);
      dot.Values?.[i]?.Value?.x?.push(dot.Values?.[i]?.Value?.x[2]);
    }
  }

  return dot;
}

export function getChartValues(data: IRuleDots): IRuleDots {
  const x: Array<number> = [...data.x]
  const y: Array<number> = [...data.y]

  const xLeft = Number(x[0]?.toString()[0]);
  const xRight = x[3];

  if (xLeft !== 0) {
    for (let step = xLeft - 1; step > 0; step--) {
      x.unshift(step * 10);
      y.unshift(0);
    }
  }

  if (xRight !== 100) {
    for (let step = Number(xRight?.toString()[0]) + 1; step <= 10; step++) {
      x.push(step * 10);
      y.push(0);
    }
  }

  return {
    x,
    y
  }
}

export function getResultValues(res: number) {
  const arr = [];

  for (let i = 0; i < res; i++) {
    arr.push(0);
  }

  arr.push(1);

  for (let i = arr.length + 1; i < 100; i++) {
    arr.push(0);
  }

  return arr;
}