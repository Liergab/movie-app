import { Button } from "@mui/material";

const GenreForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
  }) => {
    return (
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            className='border border-slate-200 bg-slate-800 p-2 w-full max-w-xl rounded-md placeholder:text-slate-600 focus-within:text-slate-400'
            placeholder="Write genre name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
  
          <div className="flex justify-between">
            <Button variant="outlined" color="success" type="submit">
              {buttonText}
            </Button>
  
            {handleDelete && (
              <Button
                onClick={handleDelete}
                variant="outlined"
                color="warning"
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  export default GenreForm;