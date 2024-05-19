import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


// eslint-disable-next-line react/prop-types
export default function RTE({name, control, label, defaultValue ="",height=200 ,disable=false}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        initialValue={defaultValue}
        apiKey='6cyo65p7mx2317pd3stj622hcs0b40klyfuboelc9vvep5c7'
        init={{
            branding:false,
            initialValue: defaultValue,
            height: height,
            statusbar: false,
            menubar: false,
            plugins: [
            ],
            toolbar:
            "undo redo | fontfamily fontsize | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat |  spellcheckdialog a11ycheck typography | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        disabled={disable}
        />
    )}
    />

     </div>
  )}