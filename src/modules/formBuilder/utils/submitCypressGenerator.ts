import FileSaver from 'file-saver';

import { Field } from '@stores/fields';

const cypressTest = (field: Field) => {
  switch (field.type) {
    case 'Autocomplete':
      return `cy.validateAutocomplete(cy.getByName(${field.name}), valueToTest, { isRequired: ${field.validations?.required}})`;
    case 'NumericField':
      return `cy.validateNumericField(cy.getByName(${field.name}), valueToTest, { isRequired: ${field.validations?.required}, max: ${field.validations?.max}})`;
    default:
      return `cy.validateTextField(cy.getByName(${field.name}), valueToTest, { isRequired: ${field.validations?.required}, max: ${field.validations?.max}})`;
  }
};

export const submitCypressGenerator = (fields: Field[], formTitle: string) => {
  const splitedTitle = formTitle.split(' ');
  const fileName =
    splitedTitle
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('') + '.cy.ts';

  const fileContent = `/// <reference types="cypress" />
    
describe('${formTitle}', () => {
    beforeEach(() => {
        
    });

    it('When fill the form with the correct values it should submit', () => {
        ${fields.map((field) => {
          return cypressTest(field);
        })}
        cy.get('button[type="submit"]').click();
    })

    it('When fill the form with the incorrect values it should not submit', () => {
        cy.get('button[type="submit"]').click();
        ${fields.map((field) => {
          return `cy.getByName(${field.name}).should("have.attr", "aria-invalid", "true");`;
        })}
    })
})`;

  const tsxFile = new File([fileContent], fileName, { type: 'text/plain' });
  FileSaver.saveAs(tsxFile);
};
