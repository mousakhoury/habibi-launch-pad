<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendCardMail extends Mailable
{
    use Queueable, SerializesModels;

    public $cardDetails;
    /**
     * Create a new message instance.
     */

    public function __construct($cardDetails)
    {
        $this->cardDetails = $cardDetails;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Card Details',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.card',
        );
    }

    public function build()
    {
        return $this->view('emails.card')
            ->from('info@habb.finance')
            ->with([
                'cardDetails' => $this->cardDetails,
            ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
