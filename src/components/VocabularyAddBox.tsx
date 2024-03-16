export function VocabularyAddBox() {
  return (
    <div className="join">
      <input
        type="text"
        placeholder="Add your new vocabulary"
        className="input input-bordered input-primary w-72 join-item"
      />
      <button className="btn btn-primary join-item">
        Add
        {/* <span className="loading loading-dots loading-sm "></span> */}
      </button>
    </div>
  );
}
