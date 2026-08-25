import type { Decision } from '@axonivy/rule-editor-protocol';
export const mockData = [{ salaryYear: 50_000, disabled: false, getsBenefits: false }];

export const mockDecisions: Decision[] = [
  {
    name: 'Benefits by salary',
    description: 'If salary is below 60k, then you get benefits',
    when: [
      {
        field: 'salaryYear',
        operator: '<',
        value: '60_000'
      }
    ],
    then: [
      {
        field: 'getsBenefits',
        value: 'true'
      }
    ]
  },
  {
    name: 'Benefits by disabled',
    description: 'If disabled, then you get benefits',
    when: [
      {
        field: 'disabled',
        operator: '==',
        value: 'true'
      }
    ],
    then: [
      {
        field: 'getsBenefits',
        value: 'true'
      }
    ]
  },
  {
    name: 'No benefits for rich disabled',
    description: 'If disabled and rich, then you get no benefits',
    when: [
      {
        field: 'disabled',
        operator: '==',
        value: 'true'
      },
      {
        field: 'salaryYear',
        operator: '>=',
        value: '100_000'
      }
    ],
    then: [
      {
        field: 'getsBenefits',
        value: 'false'
      }
    ]
  }
];
