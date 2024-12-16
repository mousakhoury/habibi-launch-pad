<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            /* Sets a clean and professional font */
            margin: 20px;
            color: #333333;
            /* Dark gray text for better readability */
            line-height: 1.6;
        }

        .container {
            background-color: #f9f9f9;
            /* Light gray background */
            border: 1px solid #e1e1e1;
            /* Subtle border */
            padding: 20px;
            max-width: 600px;
            /* Limits the width of the content */
            margin: auto;
        }

        .button {
            background-color: #4CAF50;
            /* Green background for the button */
            color: white;
            /* White text for the button */
            padding: 10px 20px;
            text-align: center;
            display: inline-block;
            margin: 20px 0;
            text-decoration: none;
            border-radius: 5px;
        }

        h1 {
            color: #444444;
            /* Slightly darker gray for headings */
        }

        footer {
            font-size: 0.8em;
            text-align: center;
            color: #666666;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Thank You for Your Purchase!</h1>
        <p>Thank you for ordering the <strong>{{ $cardDetails['productName'] }}</strong> on the Habibi platform.</p>
        <p>Please click the link below to redeem your card using this code:
            <strong>{{ $cardDetails['vouchers'][0]['code'] }}</strong>
        </p>
        <p>Your order ID is: <strong>{{ $cardDetails['orderId'] }}</strong></p>

        <!-- Button for redeeming the voucher, only if URL is available -->
        @if (!empty($cardDetails['vouchers'][0]['url']))
            <a href="{{ $cardDetails['vouchers'][0]['url'] }}" class="button">Redeem Your Card</a>
        @else
            <p>Follow the instructions provided to redeem your card.</p>
        @endif


        @if (!empty($cardDetails['howToUse']))
            <p>{!! $cardDetails['howToUse'] !!}</p>
        @endif

        <footer>
            <p>Best Regards,</p>
            <p>The Habibi Team</p>
        </footer>
    </div>
</body>

</html>
