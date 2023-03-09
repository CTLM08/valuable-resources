/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { uploadPost } from '../../../firebase';
import getOgImage from '../../../tools/parser';

export default function UploadButton({ url, name, DataType }) {
  const [loading, setLoading] = useState(false);
  const navigte = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        setLoading(true);
        getOgImage(url).then((res) =>
          uploadPost(name, url, res, DataType).then(() => {
            setLoading(false);
            navigte('/');
          }),
        );
      }}
      className="w-full py-4 bg-[#c3cedc] text-[#2c2f33] rounded-md shadow-md font-semibold mt-4 flex items-center justify-center gap-4 hover:bg-[#b3bdc9] transition-all h-16"
    >
      {!loading ? (
        <>
          Add Resource
          <Icon icon="material-symbols:send-rounded" className="w-5 h-5 text-[#2c2f33]" />
        </>
      ) : (
        <span className="loader" />
      )}
    </button>
  );
}
