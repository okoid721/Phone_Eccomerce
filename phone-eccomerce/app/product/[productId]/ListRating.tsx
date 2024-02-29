'use Client';

import Haeding from '@/app/components/Haeding';

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Haeding title="Product Review" />
    </div>
  );
};

export default ListRating;
