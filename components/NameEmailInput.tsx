import React from 'react';
import styles from '../app/page.module.css';

interface NameEmailInputProps {
  firstName: string;
  lastName: string;
  email: string;
  onInputChange: (name: string, value: string) => void;
}

const NameEmailInput = (props: NameEmailInputProps) => {
  const { firstName, lastName, email, onInputChange } = props;

  return (
    <div className={styles.firstAndLast}>
      <label className={styles.label}>
        First name:
        <input
          className={styles.input}
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => onInputChange('firstName', e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Last name:
        <input
          className={styles.input}
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => onInputChange('lastName', e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Email:
        <input
          className={styles.input}
          type="text"
          name="email"
          value={email}
          onChange={(e) => onInputChange('email', e.target.value)}
        />
      </label>
    </div>
  );
};

export default NameEmailInput;