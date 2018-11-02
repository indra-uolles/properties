const fakeDB = {
  'buy': [
    {
      id: '1',
      area: 67,
      address: 'г. Москва, САО, район Ховрино, ул. Дыбенко, 7',
      material: 'монолитный',
      floor: '6 из 30',
      rooms: 2,
      price: 154590,
      mortgage: false,
      instalments: false
    },
    {
      id: '2',
      area: 61,
      address: 'г. Подольск, ул. Садовая, д. 14',
      material: 'монолитный',
      floor: '6 из 17',
      rooms: 3,
      price: 2147546,
      mortgage: true,
      instalments: false
    }
  ],
  'rent': [
    {
      id: '3',
      area: 80,
      address: 'Московская область, городское поселение Ногинск, Ногинск, посёлок Ильича',
      material: 'кирпичный',
      floor: '1 из 17',
      rooms: 4,
      price: 40000
    },
    {
      id: '5',
      area: 30,
      address: 'Московская область, городской округ Звенигород',
      material: 'деревянный',
      floor: '1 из 1',
      rooms: 1,
      price: 10000
    }
  ],
  'new': [
    {
      id: '6',
      area: 28,
      address: 'Московская область, город Видное, улица Фабричная',
      material: 'кирпичный',
      floor: '2 из 17',
      rooms: 1,
      price: 4000000,
      mortgage: true,
      instalments: true
    },
    {
      id: '7',
      area: 44,
      address: 'Московская область, город Королёв',
      material: 'панельный',
      floor: '12 из 12',
      rooms: 2,
      price: 1000000,
      mortgage: true,
      instalments: false
    }
  ]
};

function delayedPromise(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

// //number name author содержит
// export const fakeFindPools = (filterStr) => {
//   return delayedPromise(500, { 
//     filtered: fakeDatabase.pools
//   });
// }

export const fakeGetProperties = (type) => {
  return delayedPromise(500, fakeDB[type]);
}