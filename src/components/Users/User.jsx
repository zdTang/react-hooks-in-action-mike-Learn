export default function Users({
  styleName,
  id,
  name,
  img,
  title,
  notes,
  onClickHandler,
}) {
  return (
    <div className={styleName} onClick={() => onClickHandler(id)}>
      <p>{id}</p>
      <h2>{name}</h2>
      <div>{img}</div>
      <div>{title}</div>
      <div>{notes}</div>
    </div>
  );
}
