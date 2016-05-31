import PlanParameters from './PlanParameters';
import PlanSubscribers from './PlanSubscribers';

const BaseModel = LunchBadgerCore.models.BaseModel;

export default class PlanDetails extends BaseModel {
  static type = 'PlanDetails';

  _date = null;

  /**
   * @type {PlanSubscribers}
   * @private
   */
  _subscribers = null;

  /**
   * @type {PlanParameters}
   * @private
   */
  _parameters = null;

  constructor(id, date) {
    super(id);

    this.date = date;
  }

  toJSON() {
    return {
      date: this.date,
      subscribers: this.subscribers.toJSON(),
      parameters: this.parameters.toJSON()
    }
  }

	/**
   * @param subscribers {PlanSubscribers}
   */
  set subscribers(subscribers) {
    if (subscribers.constructor.type === PlanSubscribers.type) {
      this._subscribers = subscribers;

      return;
    }

    this._subscribers = PlanSubscribers.create(subscribers);
  }

	/**
   * @returns {PlanSubscribers}
   */
  get subscribers() {
    return this._subscribers;
  }

	/**
   * @param parameters {PlanParameters}
   */
  set parameters(parameters) {
    if (parameters.constructor.type === PlanParameters.type) {
      this._parameters = parameters;

      return;
    }

    this._parameters = PlanParameters.create(parameters);
  }

	/**
   * @returns {PlanParameters}
   */
  get parameters() {
    return this._parameters;
  }

  set date(date) {
    this._date = date;
  }

  get date() {
    return this._date;
  }
}