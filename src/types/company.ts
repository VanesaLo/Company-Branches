export default interface ICompany {
  id_app:                       number;
  cod_app:                      string;
  descripcion:                  string;
  link_tratamiento_datos_es:    string;
  link_tratamiento_datos_en:    string;
  link_tratamiento_datos_pt:    string;
  link_tratamiento_datos_fr:    string;
  link_terminos_condiciones_es: string;
  link_terminos_condiciones_en: string;
  link_terminos_condiciones_pt: string;
  link_terminos_condiciones_fr: string;
  tiempo_caducidad_token:       number;
  telefono_contacto_es:         string;
  telefono_contacto_en:         string;
  telefono_contacto_pt:         string;
  telefono_contacto_fr:         string;
  email_contacto:               string;
  cantidad_caracteres_token:    number;
}
