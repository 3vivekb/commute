const defaults = {
  metrics: {
    cost: {
      default: 20,
      max: 50,
      min: 0,
      step: 2.5,
      unit: 'Dollars'
    },
    distance: {
      default: 25,
      max: 100,
      min: 0,
      step: 10,
      unit: 'Miles'
    },
    time: {
      default: 30,
      max: 180,
      min: 0,
      multiplier: 60,
      step: 15,
      unit: 'Minutes'
    }
  },
  modeDisplay: {
    bike: {
      color: 'red',
      title: 'Bike'
    },
    car: {
      color: 'brown',
      title: 'Car'
    },
    transit: {
      color: 'orange',
      title: 'Transit'
    },
    walk: {
      color: 'blue',
      title: 'Walk'
    }
  }
}

export default defaults
