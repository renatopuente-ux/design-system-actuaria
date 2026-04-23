import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Autocomplete } from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Autocomplete>;

// ── Shared options ─────────────────────────────────────────
const tablaOptions = [
  { value: 'cnsf-2000-i', label: 'CNSF 2000-I (Vida individual)' },
  { value: 'cnsf-2000-g', label: 'CNSF 2000-G (Grupo)' },
  { value: 'cnsf-2000-r', label: 'CNSF 2000-R (Rentas)' },
  { value: 'cnsf-2015',   label: 'CNSF 2015 (Actualizada)' },
  { value: 'soa-rp-2014', label: 'SOA RP-2014 (Internacional)' },
  { value: 'soa-rp-2000', label: 'SOA RP-2000 (Pensiones)' },
  { value: 'makeham',     label: 'Makeham-Gompertz ajustada' },
  { value: 'weibull',     label: 'Weibull (ramos técnicos)' },
];

const clienteOptions = [
  { value: 'act-001', label: 'ACTUARIA-001 · Grupo Bimbo' },
  { value: 'act-002', label: 'ACTUARIA-002 · BBVA México' },
  { value: 'act-003', label: 'ACTUARIA-003 · Pemex' },
  { value: 'act-004', label: 'ACTUARIA-004 · CFE' },
  { value: 'act-005', label: 'ACTUARIA-005 · Telcel' },
  { value: 'act-006', label: 'ACTUARIA-006 · Walmart México' },
  { value: 'act-007', label: 'ACTUARIA-007 · IMSS' },
  { value: 'act-008', label: 'ACTUARIA-008 · ISSSTE' },
];

// ── Single — Default ───────────────────────────────────────
export const SingleDefault: Story = {
  render: () => {
    const [input, setInput] = useState('');
    return (
      <div style={{ width: 364 }}>
        <Autocomplete
          type="Single"
          label="Tabla de mortalidad"
          hint="Start typing to search"
          required
          placeholder="Buscar tabla…"
          options={tablaOptions}
          inputValue={input}
          onInputChange={setInput}
          onSelect={(val) => {
            const found = tablaOptions.find((o) => o.value === val);
            if (found) setInput(found.label);
          }}
          onClear={() => setInput('')}
        />
      </div>
    );
  },
};

// ── Single — With value (filled) ──────────────────────────
export const SingleFilled: Story = {
  render: () => {
    const [input, setInput] = useState('CNSF 2000-I (Vida individual)');
    return (
      <div style={{ width: 364 }}>
        <Autocomplete
          type="Single"
          label="Tabla de mortalidad"
          hint="Start typing to search"
          required
          options={tablaOptions}
          inputValue={input}
          onInputChange={setInput}
          onSelect={(val) => {
            const found = tablaOptions.find((o) => o.value === val);
            if (found) setInput(found.label);
          }}
          onClear={() => setInput('')}
        />
      </div>
    );
  },
};

// ── Single — Error state ───────────────────────────────────
export const SingleError: Story = {
  render: () => {
    const [input, setInput] = useState('');
    return (
      <div style={{ width: 364 }}>
        <Autocomplete
          type="Single"
          label="Tabla de mortalidad"
          hint="Start typing to search"
          required
          placeholder="Buscar tabla…"
          options={tablaOptions}
          inputValue={input}
          onInputChange={setInput}
          onClear={() => setInput('')}
          errorMessage="Selecciona una tabla de mortalidad válida"
        />
      </div>
    );
  },
};

// ── Single — Optional ──────────────────────────────────────
export const SingleOptional: Story = {
  render: () => {
    const [input, setInput] = useState('');
    return (
      <div style={{ width: 364 }}>
        <Autocomplete
          type="Single"
          label="Tabla de mortalidad"
          hint="Start typing to search"
          optional
          placeholder="Buscar tabla…"
          options={tablaOptions}
          inputValue={input}
          onInputChange={setInput}
          onSelect={(val) => {
            const found = tablaOptions.find((o) => o.value === val);
            if (found) setInput(found.label);
          }}
          onClear={() => setInput('')}
        />
      </div>
    );
  },
};

// ── Single — Disabled ──────────────────────────────────────
export const SingleDisabled: Story = {
  render: () => (
    <div style={{ width: 364 }}>
      <Autocomplete
        type="Single"
        label="Tabla de mortalidad"
        hint="Start typing to search"
        required
        options={tablaOptions}
        inputValue="CNSF 2000-I (Vida individual)"
        disabled
      />
    </div>
  ),
};

// ── Multiple — Default ─────────────────────────────────────
export const MultipleDefault: Story = {
  render: () => {
    const [input, setInput]       = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (val: string) => {
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );
    };
    return (
      <div style={{ width: 364 }}>
        <Autocomplete
          type="Multiple"
          label="Cliente"
          hint="Start typing to search"
          required
          placeholder="Buscar cliente…"
          options={clienteOptions}
          inputValue={input}
          selectedValues={selected}
          onInputChange={setInput}
          onToggle={toggle}
          onClear={() => { setInput(''); setSelected([]); }}
        />
      </div>
    );
  },
};

// ── Multiple — With selections (filled) ───────────────────
export const MultipleFilled: Story = {
  render: () => {
    const [input, setInput]       = useState('');
    const [selected, setSelected] = useState<string[]>(['act-001', 'act-003']);
    const toggle = (val: string) => {
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );
    };
    return (
      <div style={{ width: 364 }}>
        <Autocomplete
          type="Multiple"
          label="Clientes"
          hint="Start typing to search"
          required
          placeholder="Buscar cliente…"
          options={clienteOptions}
          inputValue={input}
          selectedValues={selected}
          onInputChange={setInput}
          onToggle={toggle}
          onClear={() => { setInput(''); setSelected([]); }}
        />
      </div>
    );
  },
};

// ── Multiple — Error ───────────────────────────────────────
export const MultipleError: Story = {
  render: () => {
    const [input, setInput]       = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (val: string) => {
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );
    };
    return (
      <div style={{ width: 364 }}>
        <Autocomplete
          type="Multiple"
          label="Clientes"
          hint="Start typing to search"
          required
          placeholder="Buscar cliente…"
          options={clienteOptions}
          inputValue={input}
          selectedValues={selected}
          onInputChange={setInput}
          onToggle={toggle}
          onClear={() => { setInput(''); setSelected([]); }}
          errorMessage="Selecciona al menos un cliente"
        />
      </div>
    );
  },
};

// ── Multiple — Disabled ────────────────────────────────────
export const MultipleDisabled: Story = {
  render: () => (
    <div style={{ width: 364 }}>
      <Autocomplete
        type="Multiple"
        label="Clientes"
        hint="Start typing to search"
        required
        options={clienteOptions}
        inputValue=""
        selectedValues={['act-002', 'act-004']}
        disabled
      />
    </div>
  ),
};
