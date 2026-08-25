import type { Rule } from '@axonivy/rule-editor-protocol';
export const mockData = [{ salaryYear: 50_000, getsBenefits: false }];

export const mockDecisions: Rule[] = [
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
  }
];
