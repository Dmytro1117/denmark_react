// 1. Libraries
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// 2. Redux
import {
  selectDocsActionLoading,
  selectDocsError,
} from "../../redux/documents/documentsSelectors";
import { clearDocsError } from "../../redux/documents/documentsSlise";

// 3. Components & UI
import { Loader } from "../Loader/Loader";
import { StyledButton } from "../Buttons/Button";
import { GlobalError } from "../GlobalError/GlobalError";

// 4. Helpers, Hooks & API
import { documentCategories, countryOptions } from "../../helpers/constant";

// 5. Styled Components
import {
  SharedForm,
  SharedActions,
  SharedTextarea,
  SharedInput,
  FieldWrapper,
  SharedSelectWrapper,
  SharedSelect,
  SharedErrorText,
} from "../../commonStyles/Form.styled";

export const AddDocument = ({ country, onSubmit }) => {
  const dispatch = useDispatch();

  const isLoadingDoc = useSelector(selectDocsActionLoading);
  const serverError = useSelector(selectDocsError);

  const [category, setCategory] = useState(documentCategories[0] || "DOCUMENT");
  const [text, setText] = useState("");
  const [note, setNote] = useState("");

  const textError = serverError?.fields?.text || null;
  const noteError = serverError?.fields?.note || null;
  const categoryError = serverError?.fields?.category || null;
  const countryError = serverError?.fields?.country || null;

  const generalError =
    !textError && !categoryError && !countryError && !noteError
      ? serverError?.message
      : null;

  const countryData = countryOptions.find((opt) => opt.value === country);
  const titleHint = countryData ? countryData.label : "Unknown country";

  useEffect(() => {
    return () => {
      dispatch(clearDocsError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      country,
      category,
      text: text.trim(),
      note: note.trim(),
    });
  };

  return (
    <SharedForm onSubmit={handleSubmit} noValidate>
      {isLoadingDoc && <Loader fullscreen={false} />}

      <FieldWrapper>
        <SharedInput
          value={`${titleHint}`}
          disabled
          $hasError={!!countryError}
        />
        {countryError && <SharedErrorText>{countryError}</SharedErrorText>}
      </FieldWrapper>

      <FieldWrapper>
        <SharedSelectWrapper>
          <SharedSelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            $hasError={!!categoryError}
          >
            {documentCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SharedSelect>
          {categoryError && <SharedErrorText>{categoryError}</SharedErrorText>}
        </SharedSelectWrapper>
      </FieldWrapper>

      <FieldWrapper>
        <SharedInput
          value={text}
          placeholder="Document name"
          $hasError={!!textError}
          onChange={(e) => setText(e.target.value)}
        />

        {textError && <SharedErrorText>{textError}</SharedErrorText>}
      </FieldWrapper>

      <FieldWrapper>
        <SharedTextarea
          value={note}
          placeholder="Notes"
          onChange={(e) => setNote(e.target.value)}
          $hasError={!!noteError}
        />
        {noteError && <SharedErrorText>{noteError}</SharedErrorText>}
      </FieldWrapper>

      <GlobalError error={generalError} />

      <SharedActions>
        <StyledButton type="submit" disabled={isLoadingDoc}>
          Add Document
        </StyledButton>
      </SharedActions>
    </SharedForm>
  );
};
