import { observable, autorun, batch } from '@formily/reactive';
const obs = observable({} as any);
const handler = () => {
  obs.aa = 123;
  obs.bb = 321;
};

autorun(() => {
  console.log(obs.aa, obs.bb);
});

batch(() => {
  handler();
});

export default () => {
  return <code>404</code>;
};
