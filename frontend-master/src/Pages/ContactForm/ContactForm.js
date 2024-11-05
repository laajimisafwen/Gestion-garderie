import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import Navbar from "../../Components/Navbar/Navbar";
import './ContactForm.css';
import NavbarDefault from '../../Components/NavbarDefault/NavbarDefault';

const ContactForm = () => {
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm('service_qrwscoc', 'template_3g096qa', form.current, 'eYQJYCqvjgWnHhuAf')
            .then(
                () => {
                    alert('Message successfully sent!')
                    window.location.reload(false)
                },
                () => {
                    alert('Failed to send the message, please try again')
                }
            )
    }

    return (
        <>
            {JSON.parse(localStorage.getItem('user')) ? <Navbar /> : <NavbarDefault />}
            <div className="container contact-page">
                <div className="text-zone">
                    <h1>Pour Nous Contacter</h1>
                    <p>
                        Vous pouvez nous contacter en cas de problème ou de question ou bien de faire une réclamation.
                    </p>
                    <div className="contact-form">
                        <form ref={form} onSubmit={sendEmail}>
                            <ul>
                                <li className="half">
                                    <input placeholder="Name" type="text" name="from_name" required />
                                </li>
                                <li className="half">
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        name="from_email"
                                        required
                                    />
                                </li>
                                <li>
                                    <input
                                        placeholder="Subject"
                                        type="text"
                                        name="subject"
                                        required
                                    />
                                </li>
                                <li>
                                    <textarea
                                        placeholder="Message"
                                        name="message"
                                        required
                                    ></textarea>
                                </li>
                                <li>
                                    <input type="submit" className="flat-button" value="Envoyer" />
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactForm