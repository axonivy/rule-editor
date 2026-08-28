import type { Decision } from '@axonivy/rule-editor-protocol';

export const mockDecisions: Decision[] = [
  {
    name: 'No discount',
    when: [
      {
        field: 'memberType',
        operator: '=',
        value: 'null'
      },
      {
        field: 'purchaseAmount',
        operator: '<',
        value: '500'
      },
      {
        field: 'memberType',
        operator: '=',
        value: 'Silver'
      }
    ],
    then: [
      {
        field: 'discount',
        value: '0'
      }
    ]
  },
  {
    name: 'Low discount',
    when: [
      {
        field: 'purchaseAmount',
        operator: '<',
        value: '500'
      },
      {
        field: 'memberType',
        operator: '=',
        value: 'Gold'
      }
    ],
    then: [
      {
        field: 'discount',
        value: '2'
      }
    ]
  },
  {
    name: 'Low-medium discount',
    when: [
      {
        field: 'purchaseAmount',
        operator: '>=',
        value: '500'
      },
      {
        field: 'purchaseAmount',
        operator: '<',
        value: '2000'
      },
      {
        field: 'memberType',
        operator: '=',
        value: 'Silver'
      }
    ],
    then: [
      {
        field: 'discount',
        value: '3'
      }
    ]
  },
  {
    name: 'High-medium discount',
    when: [
      {
        field: 'purchaseAmount',
        operator: '>=',
        value: '2000'
      },
      {
        field: 'memberType',
        operator: '=',
        value: 'Silver'
      }
    ],
    then: [
      {
        field: 'discount',
        value: '5'
      }
    ]
  },
  {
    name: 'High discount',
    when: [
      {
        field: 'purchaseAmount',
        operator: '>=',
        value: '500'
      },
      {
        field: 'purchaseAmount',
        operator: '<',
        value: '2000'
      },
      {
        field: 'memberType',
        operator: '=',
        value: 'Gold'
      }
    ],
    then: [
      {
        field: 'discount',
        value: '8'
      }
    ]
  },
  {
    name: 'Advanced discount',
    when: [
      {
        field: 'purchaseAmount',
        operator: '>=',
        value: '2000'
      },
      {
        field: 'memberType',
        operator: '=',
        value: 'Gold'
      }
    ],
    then: [
      {
        field: 'discount',
        value: '10'
      }
    ]
  }
];
