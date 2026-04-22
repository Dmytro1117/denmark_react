// 1. Libraries
import { useEffect, useState } from "react";

// 2. Components & UI
import { PageBackground } from "../../components/PageBackground/PageBackground";
import { ServerError } from "../../components/ServerError/ServerError";
import { Loader } from "../../components/Loader/Loader";

// 3. Helpers, Hooks & API
import { countryDataLabels } from "../../helpers/constant";
import { getCountryData } from "../../helpers/externalAPI";
import {
  containerVariants,
  dataSheetItemVariants,
  CoatOfArmsVariants,
  errorVariants,
} from "../../helpers/animations";

// 4. Styled Components
import {
  PageSection,
  PageContainer,
  PageTitle,
} from "../../commonStyles/Page.styled";
import {
  DataItem,
  CoatOfArmsContainer,
  AnimatedLisWrapper,
  SearchInput,
  SearchWrapper,
  ErrorMessage,
} from "./AboutUs.styled";

export const AboutUs = () => {
  const [dataDenmark, setDenmarkData] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  useEffect(() => {
    getCountryData("Denmark").then((result) => {
      if (result?.data) {
        setDenmarkData(result.data);
      } else {
        if (result.type === "not_found") {
          setErrorInput(result.error);
        } else {
          setGeneralError(result.error);
        }
      }
    });
  }, []);

  const handleSearch = async (name) => {
    const trimmed = name.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setErrorInput(null);
    setGeneralError(null);

    const result = await getCountryData(trimmed);

    if (result?.data) {
      setDenmarkData(result.data);
    } else {
      if (result.type === "not_found" || result.type === "validation") {
        setErrorInput(result.error);
      } else {
        setGeneralError(result.error);
      }
    }
    setLoading(false);
  };

  return (
    <PageSection>
      <PageBackground />

      <PageContainer>
        <SearchWrapper>
          <SearchInput
            placeholder={"Country Search (full name)"}
            value={query}
            $isLoading={loading}
            onChange={(e) => {
              setQuery(e.target.value);
              setErrorInput(null);
              setGeneralError(null);
            }}
            onBlur={() => {
              setErrorInput(null);
              setGeneralError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            $hasError={!!errorInput}
          />

          {errorInput && (
            <ErrorMessage
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {errorInput}
            </ErrorMessage>
          )}
        </SearchWrapper>

        {dataDenmark ? (
          <AnimatedLisWrapper
            key={dataDenmark.officialName}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <PageTitle>National Data Sheet</PageTitle>

            <CoatOfArmsContainer
              variants={CoatOfArmsVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {dataDenmark.coatOfArms && (
                <img src={dataDenmark.coatOfArms} alt="Coat of Arms" />
              )}
            </CoatOfArmsContainer>

            {Object.entries(countryDataLabels).map(([key, label], idx) => {
              const value = dataDenmark[key];
              if (!value) return null;

              return (
                <DataItem
                  key={key}
                  variants={dataSheetItemVariants}
                  custom={idx}
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                </DataItem>
              );
            })}
          </AnimatedLisWrapper>
        ) : (
          !generalError && !errorInput && <Loader fullscreen={false} />
        )}
      </PageContainer>

      <ServerError error={generalError} isVisible={!!generalError} />
    </PageSection>
  );
};

export default AboutUs;
