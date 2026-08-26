import type { Decision } from '@axonivy/rule-editor-protocol';
export const mockData = [{ salaryYear: 50_000, disabled: false, getsBenefits: false }];

export const mockDecisions: Decision[] = [
  {
    name: 'Benefits by salary',
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
