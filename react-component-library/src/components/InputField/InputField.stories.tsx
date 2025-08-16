import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import { useState } from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    loading: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'password', 'email', 'number'] },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputField>;

// We create a wrapper component to manage state for the stories
const InputFieldWithState = (args) => {
  const [value, setValue] = useState(args.value || '');
  return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} />;
};

export const Default: Story = {
  render: (args) => <InputFieldWithState {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
};

export const Filled: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'filled',
    label: 'Filled Input',
  },
};

export const Ghost: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'ghost',
    label: 'Ghost Input',
  },
};

export const Invalid: Story = {
  ...Default,
  args: {
    ...Default.args,
    invalid: true,
    errorMessage: 'Please enter a valid email.',
    label: 'Invalid Input',
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
    label: 'Disabled Input',
  },
};

export const Loading: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
    label: 'Loading Input',
  },
};

export const WithHelperText: Story = {
  ...Default,
  args: {
    ...Default.args,
    helperText: 'This is a helpful hint.',
    label: 'Input with Helper',
  },
};

export const Password: Story = {
  ...Default,
  args: {
    ...Default.args,
    type: 'password',
    label: 'Password',
  },
};

export const WithClearButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    showClearButton: true,
    value: 'Some text here',
    label: 'Input with Clear',
  },
};

export const Large: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'lg',
    label: 'Large Input',
  },
};

export const Small: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'sm',
    label: 'Small Input',
  },
};