import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";

interface Prop {
  error: string | null;
}

const Retry = ({error}: Prop) => (
  <div className="text-center py-8">
    <p className="text-red-600 text-lg">Error: {error}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      <Icon icon={faRotateRight}/>
      Reintentar
    </button>
  </div>
)

export default Retry;
