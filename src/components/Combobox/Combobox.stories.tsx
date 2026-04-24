import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['Single', 'Multiple'] },
    valid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    optional: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Combobox>;

const OPTIONS = [
  { value: 'jubilacion', label: 'Jubilación patronal' },
  { value: 'desahucio', label: 'Bonificación por desahucio' },
  { value: 'desempleo', label: 'Seguro de desempleo' },
  { value: 'enfermedad', label: 'Seguro de enfermedad' },
  { value: 'accidente', label: 'Seguro de accidente' },
  { value: 'vida', label: 'Seguro de vida' },
];

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 360 }}>{children}</div>
);

// ─── Single mode ──────────────────────────────────────────────────────────────

export const SingleDefault: Story = {
  name: 'Single / Default',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Wrapper>
        <Combobox
          label="Cobertura"
          value={val}
          onChange={setVal}
          options={OPTIONS}
          placeholder="Selecciona o escribe una cobertura…"
          clearable
        />
      </Wrapper>
    );
  },
};

export const SingleFilled: Story = {
  name: 'Single / Filled',
  render: () => {
    const [val, setVal] = useState('jubilacion');
    return (
      <Wrapper>
        <Combobox
          label="Cobertura"
          value={val}
          onChange={setVal}
          options={OPTIONS}
          clearable
        />
      </Wrapper>
    );
  },
};

export const SingleOpen: Story = {
  name: 'Single / Open',
  render: () => {
    const [val, setVal] = useState('');
    // defaultOpen via initial state
    const [isOpen] = useState(true);
    return (
      <Wrapper>
        {/* Render with an autofocus trick: wrap in a div and forward open via key */}
        <div
          ref={(el) => {
            if (el) {
              const input = el.querySelector('input');
              if (input && document.activeElement !== input) {
                input.focus();
              }
            }
          }}
        >
          <Combobox
            label="Cobertura"
            value={val}
            onChange={setVal}
            options={OPTIONS}
            placeholder="Selecciona o escribe una cobertura…"
            clearable
          />
        </div>
        {/* Note: to show the open state in docs, interact with the control */}
        <p style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
          Haz clic en el campo para abrir el dropdown.
        </p>
        {/* Suppress unused variable warning */}
        {isOpen && null}
      </Wrapper>
    );
  },
};

export const SingleDisabled: Story = {
  name: 'Single / Disabled',
  render: () => (
    <Wrapper>
      <Combobox
        label="Cobertura"
        value="vida"
        onChange={() => {}}
        options={OPTIONS}
        disabled
        clearable={false}
      />
    </Wrapper>
  ),
};

export const SingleInvalid: Story = {
  name: 'Single / Invalid',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Wrapper>
        <Combobox
          label="Cobertura"
          value={val}
          onChange={setVal}
          options={OPTIONS}
          placeholder="Selecciona una cobertura…"
          valid={false}
          errorMessage="Selecciona una opción válida"
          clearable
        />
      </Wrapper>
    );
  },
};

export const SingleWithHint: Story = {
  name: 'Single / With Hint',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Wrapper>
        <Combobox
          label="Cobertura"
          value={val}
          onChange={setVal}
          options={OPTIONS}
          placeholder="Selecciona o escribe una cobertura…"
          hint="Escribe para filtrar resultados"
          clearable
        />
      </Wrapper>
    );
  },
};

export const SingleOptional: Story = {
  name: 'Single / Optional',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Wrapper>
        <Combobox
          label="Cobertura"
          value={val}
          onChange={setVal}
          options={OPTIONS}
          placeholder="Selecciona una cobertura…"
          optional
          clearable
        />
      </Wrapper>
    );
  },
};

export const SingleRequired: Story = {
  name: 'Single / Required',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Wrapper>
        <Combobox
          label="Cobertura"
          value={val}
          onChange={setVal}
          options={OPTIONS}
          placeholder="Selecciona una cobertura…"
          required
          clearable
        />
      </Wrapper>
    );
  },
};

// ─── Multiple mode ────────────────────────────────────────────────────────────

export const MultipleDefault: Story = {
  name: 'Multiple / Default',
  render: () => {
    const [vals, setVals] = useState<string[]>([]);
    return (
      <Wrapper>
        <Combobox
          label="Coberturas"
          type="Multiple"
          values={vals}
          onChangeMultiple={setVals}
          options={OPTIONS}
          placeholder="Selecciona una o más coberturas…"
          clearable
        />
      </Wrapper>
    );
  },
};

export const MultipleFilled: Story = {
  name: 'Multiple / Filled',
  render: () => {
    const [vals, setVals] = useState<string[]>(['jubilacion', 'vida']);
    return (
      <Wrapper>
        <Combobox
          label="Coberturas"
          type="Multiple"
          values={vals}
          onChangeMultiple={setVals}
          options={OPTIONS}
          placeholder="Agrega más coberturas…"
          clearable
        />
      </Wrapper>
    );
  },
};

export const MultipleDisabled: Story = {
  name: 'Multiple / Disabled',
  render: () => (
    <Wrapper>
      <Combobox
        label="Coberturas"
        type="Multiple"
        values={['jubilacion', 'desahucio']}
        onChangeMultiple={() => {}}
        options={OPTIONS}
        disabled
        clearable={false}
      />
    </Wrapper>
  ),
};

export const MultipleInvalid: Story = {
  name: 'Multiple / Invalid',
  render: () => {
    const [vals, setVals] = useState<string[]>([]);
    return (
      <Wrapper>
        <Combobox
          label="Coberturas"
          type="Multiple"
          values={vals}
          onChangeMultiple={setVals}
          options={OPTIONS}
          placeholder="Selecciona al menos una cobertura…"
          valid={false}
          errorMessage="Debes seleccionar al menos una cobertura"
          clearable
        />
      </Wrapper>
    );
  },
};

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  render: (args) => {
    const [val, setVal] = useState('');
    const [vals, setVals] = useState<string[]>([]);
    const isMultiple = args.type === 'Multiple';
    return (
      <Wrapper>
        <Combobox
          {...args}
          value={isMultiple ? '' : val}
          onChange={isMultiple ? undefined : setVal}
          values={isMultiple ? vals : undefined}
          onChangeMultiple={isMultiple ? setVals : undefined}
          options={OPTIONS}
        />
      </Wrapper>
    );
  },
  args: {
    label: 'Cobertura',
    type: 'Single',
    placeholder: 'Selecciona o escribe…',
    hint: '',
    errorMessage: '',
    disabled: false,
    clearable: true,
    optional: false,
    required: false,
    valid: true,
  },
};
