// 1. Libraries
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// 2. Redux
import { clearDocsError } from "../../redux/documents/documentsSlise";
import {
  selectDocsActionLoading,
  selectDocsError,
} from "../../redux/documents/documentsSelectors";

// 3. Components & UI
import { StyledButton } from "../Buttons/Button";
import { Loader } from "../Loader/Loader";
import { GlobalError } from "../GlobalError/GlobalError";

// 4. Helpers, Hooks & API
import { documentCategories } from "../../helpers/constant";

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

export const EditDocument = ({ doc, onSubmit }) => {
  const dispatch = useDispatch();

  const isLoadingEditDoc = useSelector(selectDocsActionLoading);
  const serverError = useSelector(selectDocsError);

  const [category, setCategory] = useState(documentCategories[0]);
  const [text, setText] = useState(doc?.text || "");
  const [note, setNote] = useState(doc?.note || "");

  const textError = serverError?.fields?.text || null;
  const noteError = serverError?.fields?.note || null;
  const categoryError = serverError?.fields?.category || null;

  const generalError =
    !textError && !noteError && !categoryError
      ? serverError?.message || serverError
      : null;

  useEffect(() => {
    if (!doc) return;
    setCategory(doc.category ?? documentCategories[0]);
    setText(doc.text);
    setNote(doc.note ?? "");
  }, [doc]);

  useEffect(() => {
    return () => {
      dispatch(clearDocsError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      category,
      text: text.trim(),
      note: note.trim(),
    });
  };

  return (
    <SharedForm onSubmit={handleSubmit} noValidate>
      {isLoadingEditDoc && <Loader fullscreen={false} />}

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
          rows={3}
          $hasError={!!noteError}
        />
        {noteError && <SharedErrorText>{noteError}</SharedErrorText>}
      </FieldWrapper>

      <GlobalError error={generalError} />

      <SharedActions>
        <StyledButton type="submit" disabled={isLoadingEditDoc}>
          Save Changes
        </StyledButton>
      </SharedActions>
    </SharedForm>
  );
};
