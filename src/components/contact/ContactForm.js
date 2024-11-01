import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../services/api";

const ContactSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
`;

const FormContainer = styled(motion.form)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #444;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${(props) => (props.error ? "#ff4d4f" : "#e1e1e1")};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${(props) => (props.error ? "#ff4d4f" : "#e1e1e1")};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

const ErrorMessage = styled(motion.span)`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled(motion.button)`
  background: #0070f3;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s ease;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
`;

const StatusMessage = styled(motion.div)`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
  text-align: center;

  &.success {
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    color: #52c41a;
  }

  &.error {
    background: #fff2f0;
    border: 1px solid #ffccc7;
    color: #ff4d4f;
  }
`;

const LoadingSpinner = styled(motion.div)`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  margin-left: 10px;
`;

const ContactForm = () => {
  const initialFormState = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await api.submitContact(formData);
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData(initialFormState);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContactInfo = styled.div`
    margin-top: 3rem;
    text-align: center;
  `;

  const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
  `;

  const SocialLink = styled(motion.a)`
    color: #666;
    font-size: 1.5rem;
    transition: color 0.2s ease;

    &:hover {
      color: #0070f3;
    }
  `;

  return (
    <ContactSection>
      <ContactHeader>
        <Title initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Get in Touch
        </Title>
        <Subtitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          Have a question or want to work together? Drop me a message!
        </Subtitle>
      </ContactHeader>

      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onSubmit={handleSubmit}
      >
        <AnimatePresence>
          {status && (
            <StatusMessage
              className={status.type}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {status.message}
            </StatusMessage>
          )}
        </AnimatePresence>

        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.name && (
              <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {errors.name}
              </ErrorMessage>
            )}
          </AnimatePresence>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.email && (
              <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {errors.email}
              </ErrorMessage>
            )}
          </AnimatePresence>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.message && (
              <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {errors.message}
              </ErrorMessage>
            )}
          </AnimatePresence>
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting} whileTap={{ scale: 0.98 }}>
          {isSubmitting ? (
            <>
              Sending...
              <LoadingSpinner
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </>
          ) : (
            "Send Message"
          )}
        </SubmitButton>
      </FormContainer>
      <ContactInfo>
        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Or connect with me on:
        </motion.h3>
        <SocialLinks>
          <SocialLink
            href="https://linkedin.com/in/jai-d"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
          >
            <i className="fab fa-linkedin"></i>
          </SocialLink>
          <SocialLink
            href="https://github.com/Jai-Dhiman"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
          >
            <i className="fab fa-github"></i>
          </SocialLink>
        </SocialLinks>
      </ContactInfo>
    </ContactSection>
  );
};

export default ContactForm;
