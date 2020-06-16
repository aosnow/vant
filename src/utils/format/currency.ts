// ------------------------------------------------------------------------------
// name: cur
// author: mudas( mschool.tech )
// created: 2020/6/12
// ------------------------------------------------------------------------------

type AnyVal = number | string | Currency;

interface Options {
  symbol: string;
  separator: string;
  decimal: string;
  formatWithSymbol: boolean;
  errorOnInvalid: boolean;
  precision: number;
  increment: number;
  useVedic: boolean;
  groups: RegExp | string;
  pattern: string;
  negativePattern: string;
}

const Defaults: Options = {
  symbol: '$',
  separator: ',',
  decimal: '.',
  formatWithSymbol: false,
  errorOnInvalid: false,
  precision: 2,
  increment: 0,
  useVedic: false,
  groups: '',
  pattern: '!#',
  negativePattern: '-!#'
};

function round(v: number): number {
  return Math.round(v);
}

function pow(p: number): number {
  // eslint-disable-next-line no-restricted-properties
  return Math.pow(10, p);
}

function rounding(value: number, increment: number): number {
  return round(value / increment) * increment;
}

const groupRegex = /(\d)(?=(\d{3})+\b)/g;
const vedicRegex = /(\d)(?=(\d\d)+\d\b)/g;

export class Currency {

  constructor(value: AnyVal, options?: Options) {
    const settings: Options = { ...Defaults, ...options };
    const precision: number = pow(settings.precision);

    const v = this._parse(value, settings);
    this._intValue = v;
    this._value = v / precision; // 设置默认增量值 Set default incremental value

    settings.increment = settings.increment || 1 / precision; // Support vedic numbering systems
    // see: https://en.wikipedia.org/wiki/Indian_numbering_system

    if (settings.useVedic) {
      settings.groups = vedicRegex;
    }
    else {
      settings.groups = groupRegex;
    } // Intended for internal usage only - subject to change

    this._s = settings;
    this._p = precision;
  }

  // --------------------------------------------------------------------------
  //
  // Class properties
  //
  // --------------------------------------------------------------------------

  // 配置项
  // settings
  _s: Options;

  // 精度（几位小数）
  // precision
  _p: number;

  // ----------------------------------------
  // intValue
  // ----------------------------------------

  _intValue = 0;

  get intValue() {
    return this._intValue;
  }

  // ----------------------------------------
  // value
  // ----------------------------------------

  _value = 0;

  get value() {
    return this._value;
  }

  // --------------------------------------------------------------------------
  //
  // Class methods
  //
  // --------------------------------------------------------------------------

  _setValue(value: AnyVal) {
    const v = this._parse(value, this._s);
    this._intValue = v;
    this._value = v / this._p; // 设置默认增量值 Set default incremental value
    return this;
  }

  _parse(value: AnyVal, options: Options, ...args: any[]): number {
    const useRounding = args.length > 2 && args[2] !== undefined ? args[2] : true;
    const { decimal, precision: decimals, errorOnInvalid } = options;
    const precision = pow(decimals);
    const isNumber = typeof value === 'number';
    const isString = typeof value === 'string';

    let v: any = 0;

    if (isNumber) {
      v = (value as number) * precision;
    }
    else if (isString) {
      const regex = new RegExp('[^-\\d' + decimal + ']', 'g');
      const decimalString = new RegExp('\\' + decimal, 'g');
      v = (value as string).replace(/\((.*)\)/, '-$1') // 允许负数 e.g. (1.99)
                           .replace(regex, '') // 替换任何非数值 replace any non numeric values
                           .replace(decimalString, '.'); // 转换任何十进制值 convert any decimal values
      v *= precision; // 将数字修正为整数值 scale number to integer value
      v = v || 0;
    }
    else if (value instanceof Currency) {
      v = (value as Currency).value * precision;
    }
    else {
      if (errorOnInvalid) throw Error('Invalid Input');
      v = 0;
    } // Handle additional decimal for proper rounding.

    v = v.toFixed(4);
    return useRounding ? round(v) : v;
  }

  /**
   * Formats the value as a string according to the formatting settings.
   * @param {boolean} [useSymbol] - format with currency symbol
   * @returns {string}
   */
  format(useSymbol?: boolean | undefined) {
    const { pattern, negativePattern, formatWithSymbol, symbol, separator, decimal, groups } = this._s;
    const values = (this + '').replace(/^-/, '').split('.');
    const dollars = values[0];
    const cents = values[1]; // set symbol formatting

    typeof useSymbol === 'undefined' && (useSymbol = formatWithSymbol);
    return (this.value >= 0 ? pattern : negativePattern).replace('!', useSymbol ? symbol : '')
                                                        .replace('#', ''.concat(dollars.replace(groups, '$1' + separator))
                                                                        .concat(cents ? decimal + cents : ''));
  }

  /**
   * Adds values together.
   * @param {number} number
   * @returns {Currency}
   */
  add(number: number) {
    let { intValue } = this;
    const { _p: _precision, _s: _settings } = this;
    intValue += this._parse(number, _settings);
    return this._setValue(intValue / _precision);
  }

  /**
   * Subtracts value.
   * @param {number} number
   * @returns {Currency}
   */
  subtract(number: number) {
    let { intValue } = this;
    const { _p: _precision, _s: _settings } = this;
    intValue -= this._parse(number, _settings);
    return this._setValue(intValue / _precision);
  }

  /**
   * Multiplies values.
   * @param {number} number
   * @returns {Currency}
   */
  multiply(number: number) {
    let { intValue } = this;
    const { _s: _settings } = this;
    intValue *= number;
    return this._setValue(intValue / pow(_settings.precision));
  }

  /**
   * Divides value.
   * @param {number} number
   * @returns {Currency}
   */
  divide(number: number) {
    let { intValue } = this;
    const { _s: _settings } = this;
    intValue /= this._parse(number, _settings, false);
    return this._setValue(intValue);
  }

  /**
   * Takes the Currency amount and distributes the values evenly. Any extra pennies
   * left over from the distribution will be stacked onto the first set of entries.
   * @param {number} count
   * @returns {array}
   */
  distribute(count: number) {
    const { intValue, _p: _precision } = this;

    const distribution = [];
    const split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count);
    let pennies = Math.abs(intValue - split * count);

    for (; count !== 0; count--) {
      let item = this._setValue(split / _precision); // Add any left over pennies

      pennies-- > 0 && (item = intValue >= 0 ? item.add(1 / _precision) : item.subtract(1 / _precision));
      distribution.push(item);
    }

    return distribution;
  }

  /**
   * Returns the dollar value.
   * @returns {number}
   */
  dollars() {
    return ~~this.value;
  }

  /**
   * Returns the cent value.
   * @returns {number}
   */
  cents() {
    const { intValue, _p: _precision } = this;
    return ~~(intValue % _precision);
  }

  /**
   * Formats the value as a string according to the formatting settings.
   * @returns {string}
   */
  toString() {
    const { _intValue, _p: precision, _s: settings } = this;
    return rounding(_intValue / precision, settings.increment).toFixed(settings.precision);
  }

  /**
   * Value for JSON serialization.
   * @returns {float}
   */
  toJSON() {
    return this.value;
  }
}

/**
 * 移除货币价格小数位后的0
 * <p>
 * 例如：
 * <p>5.10 => 5.1</p>
 * <p>5.00 => 5</p>
 * </p>
 * @param value
 */
export function removeTrailingZeros(value: number | string) {
  return (value + '').replace(/\.?0{1,2}$/g, '');
}

export function currency(value: AnyVal, options?: Options) {
  return new Currency(value, options);
}
