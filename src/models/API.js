import _ from 'lodash';
import APIPlan from './APIPlan';

const PublicEndpoint = LunchBadgerManage.models.PublicEndpoint;
const BaseModel = LunchBadgerCore.models.BaseModel;

export default class API extends BaseModel {
  static type = 'API';

  /**
   * @type {Endpoint[]}
   * @private
   */
  _publicEndpoints = [];

  /**
   * @type {APIPlan[]}
   * @private
   */
  _plans = [];

  _accept = [PublicEndpoint.type];

  constructor(id, name) {
    super(id);

    const defaultPlans = [
      APIPlan.create({name: 'Free', icon: 'fa-paper-plane'}),
      APIPlan.create({name: 'Developer', icon: 'fa-plane'}),
      APIPlan.create({name: 'Professional', icon: 'fa-fighter-jet'})
    ];

    this.name = name;
    this.plans = defaultPlans.slice();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      publicEndpoints: this.publicEndpoints.map(endpoint => endpoint.toJSON()),
      plans: this.plans.map(plan => plan.toJSON()),
      itemOrder: this.itemOrder,
      portalId: this.portalId
    }
  }

  /**
   * @param endpoints {Endpoint[]}
   */
  set publicEndpoints(endpoints) {
    this._publicEndpoints = endpoints.map((endpoint) => {
      endpoint.wasBundled = true;
      return PublicEndpoint.create(endpoint);
    });
  }

  /**
   * @returns {Endpoint[]}
   */
  get publicEndpoints() {
    return this._publicEndpoints;
  }

  /**
   * @param plans {APIPlan[]}
   */
  set plans(plans) {
    this._plans = plans.map((plan) => {
      return APIPlan.create(plan);
    });
  }

  /**
   * @returns {APIPlan[]}
   */
  get plans() {
    return this._plans;
  }

  /**
   * @param endpoint {Endpoint}
   */
  addEndpoint(endpoint) {
    endpoint.wasBundled = true;
    this._publicEndpoints.push(endpoint);
  }

  removeEndpoint(endpoint) {
    this._publicEndpoints.splice(_.findIndex(this.publicEndpoints, {id: endpoint.id}), 1);
  }

  /**
   * @param plan {APIPlan}
   */
  addPlan(plan) {
    this._plans.push(plan);
  }

  /**
   * @param plan {APIPlan}
   */
  removePlan(plan) {
    this._plans.splice(_.findIndex(this.plans, {id: plan.id}), 1);
  }

  get accept() {
    return this._accept;
  }
}
