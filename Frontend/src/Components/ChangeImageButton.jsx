function ChangeImageButton({ onChange }) {
  return (
    <label className="btn btn-primary">
      Change Image
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
          }
        }}
        style={{ display: "none" }}
      />
    </label>
  );
}
export default ChangeImageButton;
