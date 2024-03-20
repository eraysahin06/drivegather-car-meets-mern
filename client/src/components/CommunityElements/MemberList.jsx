import PropTypes from 'prop-types';
import AttendeeMemberCard from '../AttendeeMemberCard/AttendeeMemberCard';

const MemberList = ({ members }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">
        Current Members ({members.length})
      </h3>
      <div className="flex flex-wrap justify-center">
        {members.map((memberId) => (
          <AttendeeMemberCard key={memberId} memberId={memberId} />
        ))}
      </div>
    </div>
  );
};

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MemberList;
