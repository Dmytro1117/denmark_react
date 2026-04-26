// 1. Libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCheck, FiEdit3 } from "react-icons/fi";
import { ImBin } from "react-icons/im";

// 2. Redux
import {
  addDocument,
  updateDocument,
} from "../../redux/documents/operationsDocuments";
import { selectDocsActionLoading } from "../../redux/documents/documentsSelectors";

// 3. Components & UI
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Modal } from "../../components/Modal/Modal";
import { StyledButton } from "../../components/Buttons/Button";
import { PagesTabs } from "../../components/PagesTabs/PageTabs";
import { ServerError } from "../../components/ServerError/ServerError";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import { EditDocument } from "../../components/EditDocument/EditDocument";
import { PageBackground } from "../../components/PageBackground/PageBackground";
import { AddDocument } from "../../components/AddDocument/AddDocument";
import { EmptyPage } from "../../components/EmptyPage/EmptyPage";
import { Loader } from "../../components/Loader/Loader";

// 4. Helpers, Hooks & API
import { documentItemVariants } from "../../helpers/animations";
import { useDocuments } from "../../helpers/hooks";
import { countryOptions } from "../../helpers/constant";

// 5. Styled Components
import {
  PageSection,
  PageContainer,
  PageTitle,
} from "../../commonStyles/Page.styled";
import {
  DataGrid,
  DataItem,
  DocumentTabsWrapper,
  DocNote,
  DocText,
  DocMain,
  IconButton,
  ActionGroup,
  StatusSquare,
  StatusWrapper,
  ModeButtons,
} from "./Documents.styled";

export const Documents = () => {
  const dispatch = useDispatch();

  const [activeCountry, setActiveCountry] = useState(
    countryOptions[0]?.value || "ua",
  );

  const {
    documents,
    mode,
    toggleMode,
    percentProgress,
    isLoggedIn,
    isLoading: isDocsLoading,
    isInitialLoading: isDocsInitialLoading,
    updatingId,
    toggleDone,
    removeDocument,
    isEmptyDocuments,
    serverError,
    clearDocumentError,
  } = useDocuments(activeCountry);

  const isActionDocsLoading = useSelector(selectDocsActionLoading);

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmToDelete, setConfirmToDelete] = useState(null);

  const isValidationError =
    serverError?.fields?.text ||
    serverError?.fields?.note ||
    serverError?.fields?.category ||
    serverError?.fields?.country;
  const globalPageError =
    serverError && !isValidationError ? serverError : null;

  const handleAddSubmit = ({ category, text, note }) => {
    dispatch(addDocument({ country: activeCountry, category, text, note }))
      .unwrap()
      .then(() => {
        setModalAddOpen(false);
        clearDocumentError();
      })
      .catch(() => {});
  };

  const handleEditSubmit = ({ category, text, note }) => {
    if (!selectedDoc) return;

    dispatch(
      updateDocument({
        id: selectedDoc._id,
        category,
        text: text.trim(),
        note: note.trim(),
      }),
    )
      .unwrap()
      .then(() => {
        setModalEditOpen(false);
        clearDocumentError();
      })
      .catch(() => {});
  };

  const handleOpenEditModal = (doc) => {
    if (!isLoggedIn || doc._isDefault) return;
    setSelectedDoc(doc);
    setModalEditOpen(true);
  };

  const openDeleteConfirm = (delDoc) => {
    setConfirmToDelete(delDoc);
    setConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setConfirmOpen(false);
    setConfirmToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!confirmToDelete?._id) return;

    removeDocument(confirmToDelete)
      .unwrap()
      .then(() => {
        closeDeleteConfirm();
      })
      .catch(() => {
        closeDeleteConfirm();
      });
  };

  return (
    <PageSection>
      <PageBackground />
      <PageContainer>
        <PageTitle>National Documents</PageTitle>
        <ProgressBar percent={percentProgress} country={activeCountry} />

        <DocumentTabsWrapper>
          {!globalPageError && (
            <>
              <PagesTabs
                options={countryOptions}
                activeValue={activeCountry}
                onChange={setActiveCountry}
              />

              {isLoggedIn && !isDocsLoading && (
                <ModeButtons>
                  <StyledButton onClick={() => setModalAddOpen(true)}>
                    + Add Document
                  </StyledButton>

                  {documents.length > 0 && (
                    <>
                      <StyledButton
                        active={mode === "edit"}
                        onClick={() => toggleMode("edit")}
                      >
                        Edit
                      </StyledButton>

                      <StyledButton
                        active={mode === "delete"}
                        onClick={() => toggleMode("delete")}
                      >
                        Delete
                      </StyledButton>
                    </>
                  )}
                </ModeButtons>
              )}
            </>
          )}
        </DocumentTabsWrapper>

        {isDocsInitialLoading ? (
          <Loader fullscreen={false} />
        ) : isEmptyDocuments && !serverError ? (
          <EmptyPage
            title="National Documents is empty"
            text="Add your first document"
            variant="inline"
            onClick={() => setModalAddOpen(true)}
          />
        ) : (
          <DataGrid>
            {documents.map((doc, idx) => (
              <DataItem
                key={doc._id}
                custom={idx}
                variants={documentItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                $completed={!!doc.done}
                $country={activeCountry}
              >
                <StatusWrapper>
                  <StatusSquare
                    $completed={!!doc.done}
                    $country={activeCountry}
                    onClick={() => updatingId !== doc._id && toggleDone(doc)}
                  >
                    {updatingId === doc._id ? (
                      <Loader fullscreen={false} />
                    ) : (
                      <FiCheck />
                    )}
                  </StatusSquare>
                  <span>{doc.category}</span>
                </StatusWrapper>

                <DocMain>
                  <DocText $completed={!!doc.done}>{doc.text}</DocText>
                  {!!doc.note?.trim() && (
                    <DocNote $completed={!!doc.done} title={doc.note}>
                      {doc.note}
                    </DocNote>
                  )}
                </DocMain>

                {isLoggedIn && mode === "edit" && (
                  <ActionGroup>
                    <IconButton
                      title="Edit"
                      onClick={() => handleOpenEditModal(doc)}
                    >
                      <FiEdit3 size={18} />
                    </IconButton>
                  </ActionGroup>
                )}

                {isLoggedIn && mode === "delete" && (
                  <ActionGroup>
                    <IconButton
                      $isDelete
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteConfirm(doc);
                      }}
                    >
                      <ImBin size={18} />
                    </IconButton>
                  </ActionGroup>
                )}
              </DataItem>
            ))}
          </DataGrid>
        )}
      </PageContainer>

      <Modal
        isOpen={modalAddOpen}
        isSmall
        onClose={() => {
          setModalAddOpen(false);
          clearDocumentError();
        }}
        title="Add Document"
      >
        <AddDocument country={activeCountry} onSubmit={handleAddSubmit} />
      </Modal>

      <Modal
        isOpen={modalEditOpen}
        isSmall
        onClose={() => {
          setModalEditOpen(false);
          clearDocumentError();
        }}
        title="Edit Document"
      >
        <EditDocument doc={selectedDoc} onSubmit={handleEditSubmit} />
      </Modal>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the document “${confirmToDelete?.text ?? ""}”?`}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={closeDeleteConfirm}
        onConfirm={handleConfirmDelete}
        isLoading={isActionDocsLoading}
        error={serverError}
      />

      <ServerError
        error={serverError}
        isVisible={!modalAddOpen && !modalEditOpen}
      />
    </PageSection>
  );
};

export default Documents;
