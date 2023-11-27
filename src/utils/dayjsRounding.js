import duration from 'dayjs/plugin/duration';

const rounding = (option, dayjsClass, dayjsFactory) => {
  console.log('duration!!', duration);
  dayjsFactory.extend(duration);

  // @see https://stackoverflow.com/a/39637877
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
