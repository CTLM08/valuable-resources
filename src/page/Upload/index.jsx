/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import UploadButton from './components/UploadButton';
import DataTypeSelector from './components/DataTypeSelector';
import Input from '../../components/Input';

function Upload() {
  const [DataType, setDataType] = useState('Select type');
  const [name, setName] = useState('');
  const [url, setURL] = useState('');

  return (
    <div className="flex items-center justify-center h-full flex-col gap-4 p-40">
      <div className="flex justify-center w-full items-center gap-4 text-3xl mb-6">
        <Icon icon="uil:upload" className="h-9 w-9 text-[#c3cedc]" />
        Add Resource
      </div>
      <Input value={name} setValue={setName} placeholder="Website Name" icon="uil:tag-alt" />
      <Input value={url} setValue={setURL} placeholder="URL Link" icon="uil:link" />
      <DataTypeSelector DataType={DataType} setDataType={setDataType} />
      <UploadButton name={name} url={url} DataType={DataType} />
    </div>
  );
}

export default Upload;
