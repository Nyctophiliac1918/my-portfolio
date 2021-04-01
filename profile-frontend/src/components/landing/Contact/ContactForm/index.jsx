import React from 'react';
import axios from 'axios';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'components/common';
import { Error, Center, InputField, Wrapper } from './styles';

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default () => (
  <Wrapper>
    <h2>Contact</h2>
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
        success: false,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Full name field is required'),
        email: Yup.string().email("Invalid email")
          // TODO: add the email validation here
          .required('Email field is required'),
        message: Yup.string().required('Message field is required'),
      })}
      onSubmit={(values, actions) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact-demo", ...values })
        })
        .then(() => {
            alert("I'll get back to you ASAP!");
            actions.resetForm()
        })
        .catch(() => {
            alert('Error');
        })
        .finally(() => actions.setSubmitting(false))
      }}
    >
      {({ values, touched, errors, setFieldValue, isSubmitting }) => (
        <Form name="contact-demo" data-netlify={true}>
          <InputField>
            <Input
              as={FastField}
              type="text"
              name="name"
              component="input"
              aria-label="name"
              placeholder="Full name*"
              error={touched.name && errors.name}
            />
            <ErrorMessage component={Error} name="name" />
          </InputField>
          <InputField>
            <Input
              id="email"
              aria-label="email"
              component="input"
              as={FastField}
              type="email"
              name="email"
              placeholder="Email*"
              error={touched.email && errors.email}
            />
            <ErrorMessage component={Error} name="email" />
          </InputField>
          <InputField>
            <Input
              as={FastField}
              component="textarea"
              aria-label="message"
              id="message"
              rows="8"
              type="text"
              name="message"
              placeholder="Message*"
              error={touched.message && errors.message}
            />
            <ErrorMessage component={Error} name="message" />
          </InputField>
          {values.success && (
            <InputField>
              <Center>
                <h4>Your message has been successfully sent, I will get back to you ASAP!</h4>
              </Center>
            </InputField>
          )}
          <Center>
            <Button secondary type="submit" disabled={isSubmitting} className="submit-btn">
              Submit
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  </Wrapper>
);
