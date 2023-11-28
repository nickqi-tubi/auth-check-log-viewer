// https://github.com/iamkun/dayjs/issues/1619
const round = (option, dayjsClass, dayjsFactory) => {
  dayjsClass.prototype.round = function (amount, unit) {
    const mod = this.get(unit) % amount;

    if (mod < amount / 2) {
      return this.subtract(mod, unit).startOf(unit);
    }

    return this.add(amount - mod, unit).startOf(unit);
  };
};

export default round;
