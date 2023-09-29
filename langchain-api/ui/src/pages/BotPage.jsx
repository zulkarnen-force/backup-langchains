import { useParams } from 'react-router-dom';

function BotPage() {
  let { id } = useParams();
  
  // Use the `id` variable to fetch data for the selected bot
  // and render the bot details

  return (
    <div>
      {/* Your Bot page content */}
      <p>You are viewing bot with ID: {id}</p>
    </div>
  );
}

export default BotPage;