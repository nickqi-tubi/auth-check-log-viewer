import duration from 'dayjs/plugin/duration';

// https://github.com/iamkun/dayjs/issues/1619#issuecomment-1613627247
const rounding = (option, dayjsClass, dayjsFactory) => {
  dayjsFactory.extend(duration);

  const _round = function (amount, unit, method) {
    const duration = dayjsFactory.duration(amount, unit);
    return dayjsFactory(Math[method](this.valueOf() / duration.as('milliseconds')) * duration.as('milliseconds'));
  };

  'floor ceil round'.split(' ').forEach((method) => {
    dayjsClass.prototype[method] = function (amount, unit) {
      return _round.call(this, amount, unit, method);
    };
  });
};

export default rounding;
